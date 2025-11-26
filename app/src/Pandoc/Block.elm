module Pandoc.Block exposing (viewBlock, viewBlocks)

import Html exposing (..)
import Html.Attributes exposing (class)
import Pandoc.Inline exposing (viewInlines)
import Pandoc.Types exposing (Block(..), TableData)


viewBlocks : List Block -> List (Html msg)
viewBlocks blocks =
    List.map viewBlock blocks


viewBlock : Block -> Html msg
viewBlock block =
    case block of
        Para inlines ->
            p [] (viewInlines inlines)

        Header level inlines ->
            let
                heading =
                    case level of
                        1 ->
                            h1

                        2 ->
                            h2

                        3 ->
                            h3

                        4 ->
                            h4

                        5 ->
                            h5

                        _ ->
                            h6
            in
            heading [] (viewInlines inlines)

        BulletList items ->
            ul [ class "list-disc pl-6 space-y-2" ]
                (List.map (listItem >> wrapLi) items)

        OrderedList items ->
            ol [ class "list-decimal pl-6 space-y-2" ]
                (List.map (listItem >> wrapLi) items)

        BlockQuote nested ->
            blockquote [ class "border-l-4 border-gray-200 pl-4 italic text-gray-700" ] (viewBlocks nested)

        CodeBlock language content ->
            pre [ class "bg-gray-900 text-gray-50 p-4 rounded" ]
                [ code [ class ("language-" ++ language) ] [ text content ] ]

        Div cls nested ->
            div [ class cls ] (viewBlocks nested)

        Figure caption blocks ->
            figure [ class "my-6" ]
                (viewBlocks blocks
                    ++ [ figcaption [ class "text-sm text-gray-600" ] (viewInlines caption) ]
                )

        Table tableData ->
            viewTable tableData

        RawBlock _ content ->
            pre [] [ text content ]


wrapLi : List (Html msg) -> Html msg
wrapLi content =
    li [] content


listItem : List Block -> List (Html msg)
listItem =
    viewBlocks


viewTable : TableData -> Html msg
viewTable tableData =
    div [ class "overflow-x-auto my-6" ]
        [ table [ class "min-w-full border border-gray-200" ]
            [ caption [ class "text-left text-sm text-gray-600 p-2" ] (viewInlines tableData.caption)
            , thead []
                [ tr [] (List.map (
                        \headerCells ->
                            th [ class "border-b border-gray-200 px-3 py-2 text-left" ] (viewInlines headerCells)
                    )
                    tableData.headers
                )
            , tbody []
                (List.map
                    (\row ->
                        tr []
                            (List.map (
                                \cell ->
                                    td [ class "border-t border-gray-200 px-3 py-2 align-top" ] (viewInlines cell)
                             ) row)
                    )
                    tableData.rows
                )
            ]
        ]
