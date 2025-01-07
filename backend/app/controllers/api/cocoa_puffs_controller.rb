class Api::CocoaPuffsController < ApplicationController
  before_action :set_cocoa_puff, only: %i[ show update destroy ]

  def index
    render json: CocoaPuff.where(archived: false)
  end

=begin   
  def create
    @cocoa_puff = CocoaPuff.new(cocoa_puff_params)

    if @cocoa_puff.save
      render :show, status: :created, location: @cocoa_puff
    else
      render json: @cocoa_puff.errors, status: :unprocessable_entity
    end
  end

  def update
    if @cocoa_puff.update(cocoa_puff_params)
      render :show, status: :ok, location: @cocoa_puff
    else
      render json: @cocoa_puff.errors, status: :unprocessable_entity
    end
  end 
=end

  private
    def set_cocoa_puff
      @cocoa_puff = CocoaPuff.find(params.expect(:id))
    end

    def cocoa_puff_params
      params.expect(cocoa_puff: [ :name ])
    end
end
