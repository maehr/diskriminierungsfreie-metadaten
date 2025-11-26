module Layout.Reading exposing (reading, viewMeta)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Pandoc.Block exposing (viewBlocks)
import Pandoc.Types exposing (Author, Block, Meta)


reading : List (Html msg) -> Html msg
reading content =
    div [ class "mx-auto max-w-4xl px-4 py-8 prose lg:prose-xl relative" ] content


viewMeta : Meta -> List Block -> Html msg
viewMeta meta abstractBlocks =
    div [ class "mb-16 border-b pb-8" ]
        [ h1 [ class "text-3xl lg:text-4xl font-bold mb-2" ] [ text meta.title ]
        , case meta.subtitle of
            Just sub ->
                p [ class "text-xl text-gray-600 mb-4" ] [ text sub ]

            Nothing ->
                text ""
        , div [ class "mb-6" ]
            (List.map viewAuthor meta.authors)
        , p [ class "text-sm text-gray-500 mb-4" ]
            [ text ("Datum: " ++ meta.date) ]
        , case meta.abstract of
            Just _ ->
                div [ class "bg-gray-50 p-4 rounded-lg" ]
                    [ h2 [ class "text-lg font-semibold mb-2" ] [ text "Zusammenfassung" ]
                    , div [ class "prose" ] (viewBlocks abstractBlocks)
                    ]

            Nothing ->
                text ""
        , if not (List.isEmpty meta.keyPoints) then
            div [ class "mt-6" ]
                [ h3 [ class "text-md font-semibold mb-2" ] [ text "Kernpunkte" ]
                , ul [ class "list-disc pl-5 space-y-1" ]
                    (List.map (
                        \kp ->
                            li [] [ text kp ]
                    )
                        meta.keyPoints
                    )
                ]

          else
            text ""
        ]


viewAuthor : Author -> Html msg
viewAuthor author =
    div [ class "mb-2" ]
        [ span [ class "font-medium" ] [ text author.name ]
        , case author.orcid of
            Just orcid ->
                a [ href ("https://orcid.org/" ++ orcid), class "ml-2 text-green-600 text-sm" ]
                    [ text ("ORCID: " ++ orcid) ]

            Nothing ->
                text ""
        , case author.affiliation of
            Just aff ->
                span [ class "text-gray-600 ml-2" ] [ text ("(" ++ aff ++ ")") ]

            Nothing ->
                text ""
        , if author.corresponding then
            span [ class "ml-2 text-blue-600 text-sm" ] [ text "✉ Korrespondenz" ]

          else
            text ""
        ]
