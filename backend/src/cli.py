import argparse
import requests
import json
import sys

API_URL = "http://localhost:8000"

def generate():
    print("Triggering post generation...")
    try:
        response = requests.post(f"{API_URL}/generate")
        # Check if server is reachable
        if response.status_code == 500:
             print("Server Error. Check server logs (Likely API Key missing/invalid in .env)")
             print(response.text)
             return
        response.raise_for_status()
        data = response.json()
        print(f"Success! Queue ID: {data['queue_id']}")
        print("Result Preview:")
        print(data['result'])
    except requests.exceptions.ConnectionError:
        print(f"Error: Could not connect to server at {API_URL}. Is it running?")
    except Exception as e:
        print(f"Error: {e}")

def list_queue():
    try:
        response = requests.get(f"{API_URL}/queue")
        posts = response.json()
        if not posts:
            print("Queue is empty.")
            return
        
        print(f"Found {len(posts)} pending posts:")
        for post in posts:
            print(f"ID: {post['id']}")
            print(f"Status: {post['status']}")
            print(f"Content Preview: {post['content'][:100]}...")
            print("-" * 20)
    except requests.exceptions.ConnectionError:
        print(f"Error: Could not connect to server at {API_URL}. Is it running?")
    except Exception as e:
        print(f"Error: {e}")

def approve(post_id):
    try:
        response = requests.post(f"{API_URL}/approve/{post_id}")
        response.raise_for_status()
        print(response.json()['message'])
    except requests.exceptions.ConnectionError:
        print(f"Error: Could not connect to server at {API_URL}. Is it running?")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="LinkedIn Bot CLI")
    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("generate", help="Generate new posts")
    subparsers.add_parser("queue", help="List pending posts")
    
    approve_parser = subparsers.add_parser("approve", help="Approve a post")
    approve_parser.add_argument("post_id", help="ID of the post to approve")

    args = parser.parse_args()

    if args.command == "generate":
        generate()
    elif args.command == "queue":
        list_queue()
    elif args.command == "approve":
        approve(args.post_id)
    else:
        parser.print_help()
