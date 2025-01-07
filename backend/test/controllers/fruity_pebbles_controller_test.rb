require "test_helper"

class FruityPebblesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fruity_pebble = fruity_pebbles(:one)
  end

  test "should get index" do
    get fruity_pebbles_url, as: :json
    assert_response :success
  end

  test "should create fruity_pebble" do
    assert_difference("FruityPebble.count") do
      post fruity_pebbles_url, params: { fruity_pebble: { cocoa_puff_id: @fruity_pebble.cocoa_puff_id, name: @fruity_pebble.name, pebble_count: @fruity_pebble.pebble_count } }, as: :json
    end

    assert_response :created
  end

  test "should show fruity_pebble" do
    get fruity_pebble_url(@fruity_pebble), as: :json
    assert_response :success
  end

  test "should update fruity_pebble" do
    patch fruity_pebble_url(@fruity_pebble), params: { fruity_pebble: { cocoa_puff_id: @fruity_pebble.cocoa_puff_id, name: @fruity_pebble.name, pebble_count: @fruity_pebble.pebble_count } }, as: :json
    assert_response :success
  end

  test "should destroy fruity_pebble" do
    assert_difference("FruityPebble.count", -1) do
      delete fruity_pebble_url(@fruity_pebble), as: :json
    end

    assert_response :no_content
  end
end
