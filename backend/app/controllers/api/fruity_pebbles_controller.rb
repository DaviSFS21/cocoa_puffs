class Api::FruityPebblesController < ApplicationController
  before_action :set_fruity_pebble, only: %i[ show update destroy ]
  def show
    cocoa_puff = CocoaPuff.find(params[:cocoa_puff_id])
    render json: cocoa_puff.fruity_pebbles.all
  end
  
=begin 
  def create
    @fruity_pebble = FruityPebble.new(fruity_pebble_params)

    if @fruity_pebble.save
      render :show, status: :created, location: @fruity_pebble
    else
      render json: @fruity_pebble.errors, status: :unprocessable_entity
    end
  end
=end

  private
    def set_fruity_pebble
      @fruity_pebble = FruityPebble.find(params.expect(:id))
    end

    def fruity_pebble_params
      params.expect(fruity_pebble: [ :name, :pebble_count, :cocoa_puff_id ])
    end
end
