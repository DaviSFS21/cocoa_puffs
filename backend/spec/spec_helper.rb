require "rails_helper"

RSpec.describe CocoaPuff, type: :model do
  context "validations" do
    it "is valid with valid attributes" do
      cocoa_puff = CocoaPuff.new(name: "Test")
      expect(cocoa_puff).to be_valid
    end

    it "is not valid without 'name'" do
      cocoa_puff = CocoaPuff.new()
      expect(cocoa_puff).not_to be_valid
    end

    it "is not valid without a unique name" do
      CocoaPuff.create!(name: "Test")
      cocoa_puff = CocoaPuff.new(name: "Test")
      expect(cocoa_puff).not_to be_valid
    end
  end

  context 'associations' do
    it { should have_many(:fruity_pebbles) }
  end

  describe "not_archived" do
    it "set archived to false as default" do
      cocoa_puff = CocoaPuff.new(name: "Test")
      expect(cocoa_puff.archived).to eq(false)
    end
  end
end

RSpec.describe FruityPebble, type: :model do
  context "validations" do
    it "is valid with valid attributes" do
      cocoa_puff = CocoaPuff.create(name: "FKTest")
      fruity_pebble = FruityPebble.new(name: "Test",pebble_count: 6, cocoa_puff_id: cocoa_puff.id)
      expect(fruity_pebble).to be_valid
    end

    it "is not valid without a cocoa_puff_id" do
      fruity_pebble = FruityPebble.new(name: "Test",pebble_count: 7)
      expect(fruity_pebble).not_to be_valid
    end

    it "is not valid without an unique name" do
      cocoa_puff = CocoaPuff.create(name: "FKTest")
      FruityPebble.create(name: "Test",pebble_count: 2, cocoa_puff_id: cocoa_puff.id)
      fruity_pebble = FruityPebble.new(name: "Test",pebble_count: 4, cocoa_puff_id: cocoa_puff.id)
      expect(fruity_pebble).not_to be_valid
    end

    it "is not valid with a pebble count greater than or equal to 10" do
      cocoa_puff = CocoaPuff.create(name: "FKTest")
      fruity_pebble = FruityPebble.new(name: "Test",pebble_count: 40, cocoa_puff_id: cocoa_puff.id)
      expect(fruity_pebble).not_to be_valid
    end
  end

  context 'associations' do
    it { should belong_to(:cocoa_puff) }
  end
end
