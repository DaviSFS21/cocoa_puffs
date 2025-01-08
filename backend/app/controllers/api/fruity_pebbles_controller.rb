class Api::FruityPebblesController < ApplicationController
  def index
    cocoa_puff = CocoaPuff.find(params[:cocoa_puff_id])
    render json: cocoa_puff.fruity_pebbles.all
  end
  
  def create
    @fruity_pebble = FruityPebble.new(fruity_pebble_params)

    if @fruity_pebble.save
      render json: @fruity_pebble, status: :created, location: @fruity_pebble
    else
      render json: @fruity_pebble.errors, status: :unprocessable_entity
    end
  end

  private
    def set_fruity_pebble
      @fruity_pebble = FruityPebble.find(params.expect(:id))
    end

    def fruity_pebble_params
      params.expect([ :name, :pebble_count, :cocoa_puff_id ])
    end
end
