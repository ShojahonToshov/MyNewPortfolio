import urllib.request, re
url = 'https://dennissnellenberg.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
for link in re.findall(r'href="([^"]+\.css)"', html):
    css_url = link if link.startswith('http') else 'https://dennissnellenberg.com' + link
    if not css_url.startswith('https://dennissnellenberg.com/'):
        css_url = 'https://dennissnellenberg.com/' + css_url.lstrip('/')
    try:
        css = urllib.request.urlopen(urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        for m in re.findall(r'\.rounded-div[^{]*{[^}]+}', css):
            print(m)
    except Exception as e:
        pass
