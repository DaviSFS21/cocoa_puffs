class Api::FruityPebblesController < ApplicationController
  def index
    cocoa_puff = CocoaPuff.find(params[:cocoa_puff_id])
    render json: cocoa_puff.fruity_pebbles.all
  end
  
  def create
    @fruity_pebble = FruityPebble.new(fruity_pebble_params)

    if @fruity_pebble.save
      render json: @fruity_pebble, status: :created, location: api_cocoa_puff_fruity_pebbles_url(cocoa_puff_id: 1)
    else
      render json: { errors: @fruity_pebble.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def set_fruity_pebble
      @fruity_pebble = FruityPebble.find(params.expect(:id))
    end

    def fruity_pebble_params
      params.permit([ :name, :pebble_count, :cocoa_puff_id ])
    end
end
