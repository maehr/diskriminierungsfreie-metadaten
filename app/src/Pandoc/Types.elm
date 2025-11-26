module Pandoc.Types exposing (Author, Block(..), Inline(..), Manuscript, Meta, TableData)

import Dict exposing (Dict)


type alias Manuscript =
    { meta : Meta
    , blocks : List Block
    , footnotes : Dict Int (List Block)
    }


type alias Meta =
    { title : String
    , subtitle : Maybe String
    , authors : List Author
    , abstract : Maybe (List Block)
    , keywords : List String
    , date : String
    , lang : String
    , keyPoints : List String
    }


type alias Author =
    { name : String
    , orcid : Maybe String
    , email : Maybe String
    , affiliation : Maybe String
    , roles : List String
    , corresponding : Bool
    }


type Block
    = Para (List Inline)
    | Header Int (List Inline)
    | BulletList (List (List Block))
    | OrderedList (List (List Block))
    | BlockQuote (List Block)
    | CodeBlock String String
    | Div String (List Block)
    | Figure (List Inline) (List Block)
    | Table TableData
    | RawBlock String String


type Inline
    = Str String
    | Space
    | Emph (List Inline)
    | Strong (List Inline)
    | Link (List Inline) String
    | Image String String
    | Code String
    | FootnoteRef Int
    | Cite String
    | RawInline String String


type alias TableData =
    { caption : List Inline
    , headers : List (List Inline)
    , rows : List (List (List Inline))
    }
