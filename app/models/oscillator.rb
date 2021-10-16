class Oscillator < ApplicationRecord

  def as_json
    {
      frequency: frequency
    }
  end

end
