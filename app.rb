require "sinatra"
require "yaml"

require_relative "lib/palestine_datasets"
require_relative "lib/utils"

config = YAML.load_file("config.yaml")

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

  client = PalestineDatasets::Client.new(config["palestine-datasets"]["url"])
  summary = client.summary

  @palestinians_murdered = "#{Utils.format_with_commas(summary.gaza.killed.total + summary.west_bank.killed.total)}+"
  @palestinian_children_murdered = "#{Utils.format_with_commas(summary.gaza.killed.children + summary.west_bank.killed.children)}+"

  content_type "image/svg+xml"
  erb :"genocide-watch"
end

get "/" do
  @deployment_url = config["deployment"]["url"]
  erb :index
end
