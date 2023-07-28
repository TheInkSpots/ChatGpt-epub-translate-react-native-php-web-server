#!/bin/bash
python3 ./trans-book-py/make_book.py --book_name ./trans-book-py/bookshelf/ori/ori-6472065fb1a9b/Harry_PotterSorcererImage.epub --openai_key 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 --test --translation_style "color: #808080; font-style: italic;" --translate-tags p,br --language "Spanish" --prompt ./trans-book-py/prompt_cus.json
