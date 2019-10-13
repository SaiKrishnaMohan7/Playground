def get_unique_word(sentence, word):
    arr = sentence.split(' ');
    freq = []

    for word in arr:
        freq.append(arr.count(word))
    
    query_table = dict(zip(arr, freq))

    for key in query_table:
        if key == word:
            print(key)