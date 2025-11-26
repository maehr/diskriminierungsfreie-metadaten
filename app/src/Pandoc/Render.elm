module Pandoc.Render exposing (viewDocument)

import Html exposing (Html)
import Pandoc.Block exposing (viewBlocks)
import Pandoc.Types exposing (Manuscript)


viewDocument : Manuscript -> List (Html msg)
viewDocument manuscript =
    viewBlocks manuscript.blocks
