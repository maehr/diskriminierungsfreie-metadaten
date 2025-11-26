module Layout.Sidenote exposing (reference, sidenote)

import Html exposing (Html, div, sup, text)
import Html.Attributes exposing (class)
import String


reference : Int -> Html msg
reference number =
    sup [ class "sidenote-ref" ] [ text (String.fromInt number) ]


sidenote : List (Html msg) -> Html msg
sidenote content =
    div [ class "sidenote" ] content
