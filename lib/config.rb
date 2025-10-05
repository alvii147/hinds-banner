require "yaml"

module Config
  def self.load
    conf = YAML.load_file("config.yaml")
    conf["env"] = {
      "redis_url": ENV["HINDS_BANNER_REDIS_URL"]
    }

    conf
  end
end
