map = {'a':'n', 'b':'o', 'c':'p',
       'd':'q', 'e':'r', 'f':'s',
       'g':'t','h':'u','i':'v',
       'j':'w', 'k':'x','l':'y',
       'm':'z','n':'a','o':'b',
       'p':'c','q':'d','r':'e',
       's':'f','t':'g','u':'h',
       'v':'i', 'w':'j','x':'k',
       'y':'l','z':'m'}


def rot13(message):
    rotated = ''
    
    for char in message:
        if char.islower():
            rotated += map.get(char)
        if char.isupper():
            char = char.lower()
            rotated += map.get(char).capitalize()
        if char not in map:
            rotated += char
    return rotated