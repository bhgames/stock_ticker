require 'sinatra'
require 'yahoo_finance'
require 'httparty'
require 'pry'

get '/stocks' do
  content_type :json
  res = HTTParty.get("http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=#{params[:query]}&callback=YAHOO.Finance.SymbolSuggest.ssCallback")

  json = JSON.parse(res.body.match(/YAHOO.Finance.SymbolSuggest.ssCallback\((.*)\)/)[1]) # Not parseable json in return, we grab the parse part

  { 
    "stock" => json["ResultSet"]["Result"].map { |r| r["id"] = r["symbol"]; r } 
  }.to_json # Use Symbol as unique identifier here.
end

get '/histories' do
  content_type :json

  begin
    data = YahooFinance.historical_quotes(params[:stock_id], { start_date: Time::now-(24*60*60*30), end_date: Time::now }).map do |d|
      avg = (d.high.to_f + d.low.to_f + d.close.to_f + d.open.to_f)/4.0
      date = d.trade_date.split("-")[1..2].join("-")
      {
        average: avg,
        date: date,
        stock_id: params[:stock_id],
        id: params[:stock_id] + "-" + date # Need a unique id for ember data to work, this is a unique data pice.
      }
    end
  rescue OpenURI::HTTPError
    data = []
  end

  { "history" => data }.to_json
end