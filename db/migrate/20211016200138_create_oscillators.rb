class CreateOscillators < ActiveRecord::Migration[6.1]
  def change
    create_table :oscillators do |t|
      t.integer :frequency, default: 440

      t.timestamps
    end
  end
end
