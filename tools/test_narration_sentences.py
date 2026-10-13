"""Check punctuation handling and bilingual narration grouping."""

import unittest

from narration_sentences import normalize_narration, split_sentences


class SentenceTests(unittest.TestCase):
    def assert_split(self, text, language, expected):
        parts = split_sentences(text, language)
        self.assertEqual(expected, parts)
        self.assertEqual(text, "".join(parts))
        for part in parts:
            self.assertEqual([part], split_sentences(part, language))

    def test_japanese_sentences_and_final_fragment(self):
        self.assert_split("廊下を歩く。戸を開く。無人", "ja", ["廊下を歩く。", "戸を開く。", "無人"])

    def test_japanese_quote_and_closing_quote(self):
        self.assert_split("「昨日の残り。天ぷら、まだある」", "ja", ["「昨日の残り。天ぷら、まだある」"])
        self.assert_split("「大丈夫。」と聞いた。頷いた。", "ja", ["「大丈夫。」と聞いた。", "頷いた。"])

    def test_japanese_message_and_nested_brackets(self):
        self.assert_split("まひるから『家にいるよ。先に帰った』と返ってきた。", "ja",
                          ["まひるから『家にいるよ。先に帰った』と返ってきた。"])
        self.assert_split("『うん。ごめんね』と届いた。画面を閉じた。", "ja",
                          ["『うん。ごめんね』と届いた。", "画面を閉じた。"])
        self.assert_split("『「明日ね。」って言った。忘れないで』と書いた。送った。", "ja",
                          ["『「明日ね。」って言った。忘れないで』と書いた。", "送った。"])
        self.assert_split("待つ（返事はない。まだ既読にもならない）。歩く。", "ja",
                          ["待つ（返事はない。まだ既読にもならない）。", "歩く。"])

    def test_japanese_spaces_are_preserved(self):
        self.assert_split("朝だ。　起きる。", "ja", ["朝だ。　", "起きる。"])

    def test_english_abbreviation_and_decimal(self):
        self.assert_split("Mr. Smith paid 3.50. Then left.", "en", ["Mr. Smith paid 3.50. ", "Then left."])

    def test_english_embedded_quote_and_ellipsis(self):
        self.assert_split('"Enough?" she asked. I waited... then nodded.', "en",
                          ['"Enough?" she asked. ', 'I waited... then nodded.'])

    def test_english_closing_quote(self):
        self.assert_split('He said, "Fine." Nobody asked.', "en", ['He said, "Fine." ', 'Nobody asked.'])

    def test_bilingual_sentence_counts_can_differ(self):
        ja = ["> $scene.r001", "> $scene.r001.s002", "@se bell.mp3", "sakura: $scene.r002"]
        en = ["> $scene.r001", "> $scene.r001.s002", "> $scene.r001.s003", "@se bell.mp3", "sakura: $scene.r002"]
        self.assertEqual(normalize_narration(ja), normalize_narration(en))

    def test_continuation_must_be_consecutive_and_keep_emphasis(self):
        invalid = [
            ["> $scene.r001.s002"],
            ["> $scene.r001", "> $scene.r001.s003"],
            ["> $scene.r001", "@se bell.mp3", "> $scene.r001.s002"],
            ["> *$scene.r001*", "> $scene.r001.s002"],
            ["> $scene.r001", "> $scene.r001.s001"],
        ]
        for lines in invalid:
            with self.subTest(lines=lines), self.assertRaises(ValueError):
                normalize_narration(lines)

    def test_emphasis_survives_normalization(self):
        self.assertEqual(["> **$scene.r001**"],
                         normalize_narration(["> **$scene.r001**", "> **$scene.r001.s002**"]))


if __name__ == "__main__":
    unittest.main()
