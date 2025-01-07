require "test_helper"

class CocoaPuffsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cocoa_puff = cocoa_puffs(:one)
  end

  test "should get index" do
    get cocoa_puffs_url, as: :json
    assert_response :success
  end

  test "should create cocoa_puff" do
    assert_difference("CocoaPuff.count") do
      post cocoa_puffs_url, params: { cocoa_puff: { archived: @cocoa_puff.archived, name: @cocoa_puff.name } }, as: :json
    end

    assert_response :created
  end

  test "should show cocoa_puff" do
    get cocoa_puff_url(@cocoa_puff), as: :json
    assert_response :success
  end

  test "should update cocoa_puff" do
    patch cocoa_puff_url(@cocoa_puff), params: { cocoa_puff: { archived: @cocoa_puff.archived, name: @cocoa_puff.name } }, as: :json
    assert_response :success
  end

  test "should destroy cocoa_puff" do
    assert_difference("CocoaPuff.count", -1) do
      delete cocoa_puff_url(@cocoa_puff), as: :json
    end

    assert_response :no_content
  end
end
