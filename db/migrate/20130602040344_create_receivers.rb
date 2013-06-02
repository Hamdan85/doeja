class CreateReceivers < ActiveRecord::Migration
  def change
    create_table :receivers do |t|
      t.string :kind
      t.string :name
      t.string :city
      t.string :street
      t.string :neighborhood
      t.integer :number
      t.string :receiving
      t.text :description
      t.text :howweuse
      t.string :phone
      t.string :email

      t.timestamps
    end
  end
end
