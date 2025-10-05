require "net/http"
require "json"

module PalestineDatasets
  class Casualties
    attr_reader :total, :children, :civil_defence, :women, :press, :medical

    def initialize(data)
      if data.nil?
        data = {}
      end

      @total = data["total"]
      @children = data["children"]
      @civil_defence = data["civil_defence"]
      @women = data["women"]
      @press = data["press"]
      @medical = data["medical"]
    end
  end

  class RegionalData
    attr_reader :reports, :last_update, :massacres, :killed, :injured, :settler_attacks

    def initialize(data)
      if data.nil?
        data = {}
      end

      @reports = data["reports"]
      @last_update = data["last_update"]
      @massacres = data["massacres"]
      @killed = Casualties.new(data["killed"])
      @injured = Casualties.new(data["injured"])
      @settler_attacks = data["settler_attacks"]
    end
  end

  class KilledAgeBreakdown
    attr_reader :senior, :adult, :child, :no_age

    def initialize(data)
      if data.nil?
        data = {}
      end

      @senior = data["senior"]
      @adult = data["adult"]
      @child = data["child"]
      @no_age = data["no_age"]
    end
  end

  class KilledData
    attr_reader :records, :male, :female

    def initialize(data)
      if data.nil?
        data = {}
      end

      @records = data["records"]
      @male = KilledAgeBreakdown.new(data["male"])
      @female = KilledAgeBreakdown.new(data["female"])
    end
  end

  class Summary
    attr_reader :gaza, :west_bank, :known_killed_in_gaza, :known_press_killed_in_gaza

    def initialize(data)
      if data.nil?
        data = {}
      end

      @gaza = RegionalData.new(data["gaza"])
      @west_bank = RegionalData.new(data["west_bank"])
      @known_killed_in_gaza = KilledData.new(data["known_killed_in_gaza"])
      @known_press_killed_in_gaza = KilledData.new(data["known_press_killed_in_gaza"])
    end
  end

  class Client
    def initialize(url)
      @uri = URI(url)

      @http = Net::HTTP.new(@uri.host, @uri.port)
      @http.use_ssl = true
    end

    def summary
      req = Net::HTTP::Get.new("#{@url}/api/v3/summary.min.json")
      res = @http.request(req)
      
      if !res.is_a?(Net::HTTPSuccess)
        raise "Request failed with status code #{res.code}, #{res.body}"
      end

      Summary.new(JSON.parse(res.body))
    end
  end
end
