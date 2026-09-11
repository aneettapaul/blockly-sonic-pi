from pythonosc import udp_client


client = udp_client.SimpleUDPClient(
    "127.0.0.1",
    4560
)


code = """
use_bpm 120

play 60
"""


client.send_message(
    "/sonic-code",
    code
)


print("Code sent")
