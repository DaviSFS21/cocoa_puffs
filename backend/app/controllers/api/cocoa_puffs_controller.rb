class Api::CocoaPuffsController < ApplicationController
  before_action :set_cocoa_puff, only: %i[ update ]

  def index
    render json: CocoaPuff.where(archived: false).order(id: :asc)
  end
 
  def create
    @cocoa_puff = CocoaPuff.new(cocoa_puff_params)

    if @cocoa_puff.save
      render json: @cocoa_puff, status: :created, location: api_cocoa_puff_url(@cocoa_puff)
    else
      render json: { errors: @cocoa_puff.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @cocoa_puff.update(cocoa_puff_archived)
      render json: @cocoa_puff, status: :ok, location: api_cocoa_puff_url(@cocoa_puff)
    else
      render json: @cocoa_puff.errors, status: :unprocessable_entity
    end
  end 

  private
    def set_cocoa_puff
      @cocoa_puff = CocoaPuff.find(params.expect(:id))
    end

    def cocoa_puff_params
      params.expect(cocoa_puff: [ :name ])
    end
    
    def cocoa_puff_archived
      params.expect(cocoa_puff: [ :archived ])
    end
end
