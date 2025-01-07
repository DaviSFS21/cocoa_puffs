class CocoaPuff < ApplicationRecord
  has_many :fruity_pebbles, dependent: :destroy
  validates :name, presence: true, uniqueness: true
  attribute :archived, :boolean, default: false
end
