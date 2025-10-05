require './app'
require "rack/protection"

use Rack::Protection, except: :host_authorization
run Sinatra::Application
