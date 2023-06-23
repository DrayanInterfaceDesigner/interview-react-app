import requests
import json
from SortException import SortException
from NoUserHereException import NoUserHereException

class Users:
    def __init__(self) -> None:
        self.base = "https://jsonplaceholder.typicode.com/"
        self.users = []

    def get_users(self):
        try:
            print(f"\n--- User's gotten successfully ---")
            self.__get_users()
        except requests.exceptions.HTTPError as err:
            print(f"HTTPError: {err}")
        except requests.exceptions.RequestException as err:
            print(f"RequestException: {err}")
        except NoUserHereException as err:
            print(f"{err} Oops, no user data came from the database. The issue may be there.")
        except Exception as err:
            print(f"An error occurred {err}")

        

    def get_first_3_users(self):
        first_three = []
        for e in range(3):
            first_three.append(self.users[e])
        return first_three

    def order_by(self, field):
        try:
            print(f"\n--- Users sorted by {field} successfully ---")
            results = self.__order_by(field)
            # for r in results:
            #     print(f'\n--- User {r["name"]} ---')
            #     for key, value in r.items():
            #         print(f"{key} : {value}")
            return results
        except NoUserHereException as err:
            print(err)
        except SortException as err:
            print(err)
        except Exception as err:
            print(err)

    def dump_emails(self):
        try:
            print(f"\n--- All user's e-mails ---")
            self.__dump_emails()
        except NoUserHereException as err:
            print(err)
        except Exception as err:
            print(err)

    def remove_all(self):
        print("\n--- All users removed ---")
        return self.users.clear()
    
    def __get_users(self):
        res = requests.get(self.base + "users")
        _json = json.loads(res.text)
        
        if not _json:
            raise NoUserHereException("Oops, no user came from the database. The problem may be there.")

        for u in range(len(_json)):
            obj = {"id": _json[u]["id"], 
                   "email":_json[u]["email"], 
                   "name":_json[u]["name"], 
                   "companyName": _json[u]["company"]["name"]
            }
            self.users.append(obj)
        return self.users

    def __order_by(self, field):
        if not self.users:
            raise NoUserHereException(
                f"No user was found, you probably forgot to get_users() first."
            )

        for user in self.users:
            if field not in user:
                raise SortException(f"Missing property '{field}' in {user}.")
            
        sorted_users = sorted(self.users, key=lambda k: k[field])
        return sorted_users
    
    def __dump_emails(self):
        if not self.users:
            raise NoUserHereException(
                f"No user was found, you probably forgot to get_users() first."
            )
        for user in self.users:
            if user['email']:
                print(user['email'])
    
