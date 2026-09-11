from pythonosc import udp_client


client = udp_client.SimpleUDPClient(
    "127.0.0.1",
    4560
)


client.send_message(
    "/test",
    "hello from python"
)


print("OSC message sent")
