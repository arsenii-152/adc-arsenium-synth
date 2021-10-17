class Oscillator < ApplicationRecord

  def as_json
    {
      id: id,
      frequency: frequency
    }
  end

end
