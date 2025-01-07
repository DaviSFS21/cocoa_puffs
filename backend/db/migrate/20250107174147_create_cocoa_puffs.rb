class CreateCocoaPuffs < ActiveRecord::Migration[8.0]
  def change
    create_table :cocoa_puffs do |t|
      t.string :name
      t.boolean :archived, default: false

      t.timestamps
    end
  end
end
