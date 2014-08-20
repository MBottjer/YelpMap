class MapController < ApplicationController
  def index

  end

  def data
  	@@data = File.read("#{Rails.root}/app/assets/javascripts/yelp_edinburgh.json")
  	render :json => @@data
  end
end
