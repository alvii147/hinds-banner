require "yaml"

module Config
  def self.load
    config = YAML.load_file("config.yaml")
    config["env"] = {
      "redis_url": ENV["HINDS_BANNER_REDIS_URL"]
    }

    config
  end
end
