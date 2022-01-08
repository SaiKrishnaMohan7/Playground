from urllib.parse import urlparse

def domain_name(url):
    obj = urlparse(url)
    domain = obj.netloc
    end = len(domain) - 4
    domain = domain[4:end]

    return domain

print(domain_name("http://www.youtube.com"))