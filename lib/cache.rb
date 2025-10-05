require "json"
require "redis"

module Cache
  GENOCIDE_WATCH_KEY = "data:genocide-watch"

  class Client
    def initialize(url)
      @redis = Redis.new(url: url)
      @redis.ping
    end

    def get_genocide_watch_data
      raw_data = @redis.get(GENOCIDE_WATCH_KEY)
      raw_data.nil? ? nil : JSON.parse(raw_data)
    end

    def set_genocide_watch_data(data)
      @redis.setex(GENOCIDE_WATCH_KEY, 86400, data.to_json)
    end

    def close
      @redis.close
    end
  end
end
