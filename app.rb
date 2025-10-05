require "sinatra"

require_relative "lib/config"
require_relative "lib/palestine_datasets"
require_relative "lib/cache"
require_relative "lib/utils"

config = Config.load

get "/free-palestine" do
  variant_config = config["variants"][params["variant"]] ||= config["variants"]["classic"]
  variant_config.each do |key, value|
    instance_variable_set("@#{key}", value)
  end

  content_type "image/svg+xml"
  erb :"free-palestine"
end

get "/genocide-watch" do
  variant_config = config["variants"][params["variant"]] ||= config["variants"]["classic"]
  variant_config.each do |key, value|
    instance_variable_set("@#{key}", value)
  end

  cache_client = Cache::Client.new(config["env"]["redis_url"]) rescue nil
  cached_data = cache_client&.get_genocide_watch_data

  if cached_data.nil?
    palestine_datasets_client = PalestineDatasets::Client.new(config["palestine-datasets"]["url"])
    summary = palestine_datasets_client.summary

    @palestinians_murdered = "#{Utils.format_with_commas(summary.gaza.killed.total + summary.west_bank.killed.total)}+"
    @palestinian_children_murdered = "#{Utils.format_with_commas(summary.gaza.killed.children + summary.west_bank.killed.children)}+"

    cache_client&.set_genocide_watch_data({
      "palestinians_murdered": @palestinians_murdered,
      "palestinian_children_murdered": @palestinian_children_murdered,
    })
  else
    cached_data&.each do |key, value|
      instance_variable_set("@#{key}", value)
    end
  end

  cache_client&.close

  content_type "image/svg+xml"
  erb :"genocide-watch"
end

get "/ping" do
  "pong"
end

get "/" do
  @deployment_url = config["deployment"]["url"]
  erb :index
end
