<?xml version="1.0" encoding="UTF-8"?>
<lexicon version="1.0"
  xmlns="http://www.w3.org/2005/01/pronunciation-lexicon"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.w3.org/2005/01/pronunciation-lexicon
    http://www.w3.org/TR/2007/CR-pronunciation-lexicon-20071212/pls.xsd"
  alphabet="ipa"
  xml:lang="en-US">

  <!--
    Twi/Akan Pronunciation Dictionary for Bisa
    Asante Twi dialect (Akan language, Ghana)

    IPA sourced from:
    - Schachter & Fromkin (1968) — A Phonology of Akan, UCLA
    - Harvard ELIAS — AKAN KASA NGYEGYEEɛ (Akan Sounds)
    - LearnAkan — Akan Alphabet & Twi Consonant Digraphs
    - Wiktionary (Twi, adinkra, Ashanti entries)
    - Akan Dictionary (akandictionary.com)
    - Adinkra Symbols & Meanings (adinkrasymbols.org)

    Key phonological notes:
    - Twi ɔ = open-mid back rounded vowel /ɔ/ — like British English "caught"
      NOT the English "oh" diphthong /oʊ/
    - Twi ɛ = open-mid front unrounded /ɛ/ — like English "bed"
      NOT the English long "ay" /eɪ/
    - ny digraph = palatal nasal /ɲ/ — like Spanish ñ
    - Before front vowels, Asante Twi consonants are palatalized:
      t → [tʃ] (e.g., "tie" → "chee")
    - Tone marks (àáā) are included but most TTS engines ignore them;
      the phoneme sequence is what matters for TTS output
  -->

  <!-- ═══ APP NAME ═══════════════════════════════════════════════ -->

  <!-- "to ask" in Twi. Tones: High-Low. -->
  <lexeme>
    <grapheme>Bisa</grapheme>
    <phoneme>ˈbiːsɑ</phoneme>
    <alias>BEE-sah</alias>
  </lexeme>
  <lexeme>
    <grapheme>bisa</grapheme>
    <phoneme>ˈbiːsɑ</phoneme>
    <alias>BEE-sah</alias>
  </lexeme>

  <!-- ═══ THE LANGUAGE NAME ══════════════════════════════════════ -->

  <!--
    Native IPA: [tɕᶣi] — palatal affricate + simultaneous labialization.
    Practical TTS approximation: /tʃwiː/ → "chwee".
    "twee" is the common English mispronunciation — this corrects it.
  -->
  <lexeme>
    <grapheme>Twi</grapheme>
    <phoneme>tʃwiː</phoneme>
    <alias>chwee</alias>
  </lexeme>

  <!-- ═══ PEOPLE & REGION ════════════════════════════════════════ -->

  <!-- Authentic Akan form. Final vowel is /ɛ/ (open-mid front), not "ee". -->
  <lexeme>
    <grapheme>Asante</grapheme>
    <phoneme>ɑˈsɑntɛ</phoneme>
    <alias>ah-SAHN-teh</alias>
  </lexeme>

  <!-- Colonial anglicisation of Asante. -->
  <lexeme>
    <grapheme>Ashanti</grapheme>
    <phoneme>əˈʃɑːntiː</phoneme>
    <alias>ah-SHAHN-tee</alias>
  </lexeme>

  <!-- ═══ CULTURAL TERMS ═════════════════════════════════════════ -->

  <!-- Akan visual symbols. /ĩ/ is nasalised; /ɪŋ/ is the TTS-safe approximation. -->
  <lexeme>
    <grapheme>Adinkra</grapheme>
    <phoneme>ɑˈdɪŋkɹɑ</phoneme>
    <alias>ah-DING-krah</alias>
  </lexeme>
  <lexeme>
    <grapheme>adinkra</grapheme>
    <phoneme>ɑˈdɪŋkɹɑ</phoneme>
    <alias>ah-DING-krah</alias>
  </lexeme>

  <!-- ═══ TWI WORDS USED IN LESSONS ═════════════════════════════ -->

  <!--
    "to truly listen / hear" — Twi verb.
    Monosyllabic. Before front vowel /i/, the 't' is palatalized → [tʃ].
    High tone. Sounds like "chee" not "tee" or "tie".
  -->
  <lexeme>
    <grapheme>tie</grapheme>
    <phoneme>tʃiː</phoneme>
    <alias>chee</alias>
  </lexeme>

  <!--
    "wisdom / sense"
    /ɲ/ = palatal nasal, like Spanish ñ in señor. Tones: High-Low.
  -->
  <lexeme>
    <grapheme>Nyansa</grapheme>
    <phoneme>ɲɑnˈsɑ</phoneme>
    <alias>NYAHN-sah</alias>
  </lexeme>
  <lexeme>
    <grapheme>nyansa</grapheme>
    <phoneme>ɲɑnˈsɑ</phoneme>
    <alias>NYAHN-sah</alias>
  </lexeme>

  <!-- "heart" — 3 syllables, stress on second. /o/ = close-mid back (Twi plain o). -->
  <lexeme>
    <grapheme>Akoma</grapheme>
    <phoneme>ɑˈkoːmɑ</phoneme>
    <alias>ah-KOH-mah</alias>
  </lexeme>
  <lexeme>
    <grapheme>akoma</grapheme>
    <phoneme>ɑˈkoːmɑ</phoneme>
    <alias>ah-KOH-mah</alias>
  </lexeme>

  <!-- ═══ PROVERBS & PHRASES ═════════════════════════════════════ -->

  <!--
    "the one who asks" — domain name origin (neaobisa.com).
    ɔ prefix = 3rd person subject marker (open-mid back /ɔ/, like British "awe").
  -->
  <lexeme>
    <grapheme>Nea Obisa</grapheme>
    <phoneme>neɑ ɔˈbiːsɑ</phoneme>
    <alias>NEH-ah oh-BEE-sah</alias>
  </lexeme>

  <!--
    "he/she who does not know"
    ɔ = open-mid back /ɔ/ (NOT English "oh"). nn = prenasalised cluster.
  -->
  <lexeme>
    <grapheme>Nea Onnim</grapheme>
    <phoneme>neɑ ɔˈniːm</phoneme>
    <alias>NEH-ah oh-NEEM</alias>
  </lexeme>

  <!--
    Full proverb: "He who does not know can know from learning."
    Word by word: nea=NEH-ah | onnim=oh-NEEM | no=noh | sua=soo-ah | a=ah | ohu=oh-HOO
  -->
  <lexeme>
    <grapheme>Nea Onnim No Sua A, Ohu</grapheme>
    <phoneme>neɑ ɔniːm nɔ suɑ ɑ ɔhuː</phoneme>
    <alias>NEH-ah oh-NEEM noh soo-ah ah, oh-HOO</alias>
  </lexeme>

  <!--
    "can know / understand" — last word of the proverb.
    ɔ = open-mid back /ɔ/, NOT English "oh" diphthong.
    u = close back /u/ as in "moon".
  -->
  <lexeme>
    <grapheme>Ohu</grapheme>
    <phoneme>ɔˈhuː</phoneme>
    <alias>oh-HOO</alias>
  </lexeme>

  <!--
    "How are you?" — literally "how is your body?"
    sɛn: ɛ = open-mid front /ɛ/ as in English "bed", NOT "say".
  -->
  <lexeme>
    <grapheme>Wo ho te sɛn</grapheme>
    <phoneme>woː hoː teː sɛn</phoneme>
    <alias>woh HOH teh SEHN</alias>
  </lexeme>

  <!--
    "It will be good."
    ɔ prefix = 3rd person subject (open-mid back).
    bɛ = future tense marker.
    yɛ = /jɛ/ — "yeh" (palatal approximant /j/ + Twi ɛ).
    papa = "good", low-low tones, two syllables.
  -->
  <lexeme>
    <grapheme>Ɔbɛyɛ papa</grapheme>
    <phoneme>ɔbɛˈjɛ pɑpɑ</phoneme>
    <alias>oh-BEH-yeh PAH-pah</alias>
  </lexeme>

</lexicon>
