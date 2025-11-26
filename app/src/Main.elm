module Main exposing (main)

import Browser
import Dict
import Html exposing (Html)
import Maybe
import Layout.Reading as Reading
import Pandoc.Render
import Pandoc.Types exposing (Author, Block(..), Manuscript, Meta)


type alias Model =
    Manuscript


type Msg
    = NoOp


main : Program () Model Msg
main =
    Browser.sandbox { init = initialModel, update = update, view = view }


initialModel : Model
initialModel =
    { meta = sampleMeta
    , blocks = sampleBlocks
    , footnotes = Dict.empty
    }


sampleMeta : Meta
sampleMeta =
    { title = "Diskriminierungssensible Metadatenpraxis"
    , subtitle = Just "Ein interaktives Handbuch"
    , authors = sampleAuthors
    , abstract = Just [ Para [ Str "JSON-basierte Ausgabe des Quarto-Manuskripts als Grundlage für die Elm-Lesansicht." ] ]
    , keywords = [ "Metadaten", "Quarto", "Elm" ]
    , date = "2024-12-12"
    , lang = "de"
    , keyPoints = [ "JSON-Export aktivieren", "Elm-Frontend starten", "Tailwind-Styling anwenden" ]
    }


sampleAuthors : List Author
sampleAuthors =
    [ { name = "Moritz Mähr", orcid = Just "0000-0002-1367-1618", email = Just "moritz.maehr@gmail.com", affiliation = Just "Universität Basel", roles = [ "writing" ], corresponding = True }
    , { name = "Noëlle Schnegg", orcid = Just "0009-0008-5207-6652", email = Just "noelleschnegg@gmail.com", affiliation = Just "Universität Basel", roles = [ "writing" ], corresponding = False }
    ]


sampleBlocks : List Block
sampleBlocks =
    [ Header 2 [ Str "Interaktive Ausgabe" ]
    , Para [ Str "Die Elm-Anwendung wird aus dem Quarto-JSON gespeist und nutzt Tailwind für die Darstellung." ]
    , Div "callout-tip" [ Para [ Strong [ Str "Hinweis:" ], Space, Str "Baue die Anwendung mit pnpm run build:app." ] ]
    , BulletList
        [ [ Para [ Str "JSON-Export aus Quarto" ] ]
        , [ Para [ Str "Elm-Rendering der Blöcke" ] ]
        , [ Para [ Str "Tailwind-gestützte Gestaltung" ] ]
        ]
    ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        NoOp ->
            model


view : Model -> Html Msg
view model =
    Reading.reading
        (Reading.viewMeta model.meta (Maybe.withDefault [] model.meta.abstract)
            :: Pandoc.Render.viewDocument model
        )
