class CreateDrawings < ActiveRecord::Migration[5.2]
  def change
    create_table :drawings do |t|
      t.string :name
      t.string :title
      t.string :data

      t.timestamps
    end
  end
end
