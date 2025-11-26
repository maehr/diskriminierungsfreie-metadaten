module Pandoc.Decoder exposing (decoder)

import Json.Decode as Decode exposing (Decoder)
import Pandoc.Types exposing (Manuscript)


decoder : Decoder Manuscript
decoder =
    Decode.fail "Pandoc JSON decoding will be added in a future iteration."
