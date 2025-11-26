module Pandoc.Inline exposing (viewInline, viewInlines)

import Html exposing (..)
import Html.Attributes exposing (alt, class, href, src)
import Layout.Sidenote as Sidenote
import Pandoc.Types exposing (Inline(..))


viewInlines : List Inline -> List (Html msg)
viewInlines =
    List.map viewInline


viewInline : Inline -> Html msg
viewInline inline =
    case inline of
        Str txt ->
            text txt

        Space ->
            text " "

        Emph children ->
            em [] (viewInlines children)

        Strong children ->
            strong [] (viewInlines children)

        Link content url ->
            a [ href url, class "text-blue-700 underline" ] (viewInlines content)

        Image altText source ->
            img [ src source, alt altText, class "my-4" ] []

        Code snippet ->
            code [ class "font-mono text-sm" ] [ text snippet ]

        FootnoteRef number ->
            Sidenote.reference number

        Cite key ->
            span [ class "text-gray-700" ] [ text ("[" ++ key ++ "]") ]

        RawInline _ content ->
            text content
