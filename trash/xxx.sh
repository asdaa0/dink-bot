while :
do
read discord_body
echo "{\"content\":\"$discord_body\"}" | curl -v -H "Authorization: Bot MjgzNjg5Nzg0Mjg5OTE4OTg2.C44uWg.xZ14wn_Bt88rdLKxeudB3rr7Ork" -H "User-Agent: myBotThing (https://some.page, v0.1)" -H "Content-Type: application/json" -X POST --data-binary "@-" https://discordapp.com/api/channels/290594458569932800/messages
done