clean:
	rm -rf media/*

media: media/instagram.json media/github.json media/twitter.json
media/instagram.json:
	mkdir -p media
	curl https://www.instagram.com/rgausgaus/ | grep 'window._sharedData *=' | python -c 'import sys; data = sys.stdin.read(); print(data[data.find("{"):data.rfind("}")+1])' | jq .entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges > media/instagram.json
media/github.json:
	curl https://api.github.com/users/1egoman/repos?sort=created > media/github.json
media/twitter.json:
	@echo "generating twitter access token (request hidden as to not print key/secret in ci)"
	@curl "https://api.twitter.com/oauth2/token" \
		-H "Authorization: Basic `printf "$(TWITTER_KEY):$(TWITTER_SECRET)" | base64`" \
		-H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" \
		-d "grant_type=client_credentials" | jq -r .access_token > /tmp/twiter_access_token
	curl 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rgausnet&count=2' \
		-H "Authorization: Bearer `cat /tmp/twiter_access_token`" | jq . > media/twitter.json
	rm -rf /tmp/twiter_access_token
