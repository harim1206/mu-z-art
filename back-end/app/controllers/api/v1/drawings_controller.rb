class Api::V1::DrawingsController < ApplicationController



  def index
    drawings = Drawing.all
    render json: drawings, status: 200
  end

  def show
    @drawing = Drawing.find(params[:id])
    render json: @drawing, status: 200
  end

  def create
    drawing = Drawing.create(drawing_params)
    # byebug
    render json: drawing, status: 201
  end


  private

  def drawing_params
    params.require(:drawing).permit(:name, :title, :data)
  end



end
