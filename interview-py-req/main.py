from Users import Users
def main() -> None:
    _Users = Users()
    _Users.get_users()
    _Users.order_by('email')

    print("--- First 3 users ---")
    for user in _Users.get_first_3_users():
        print(f"\n> User: {user['name']}")
        for key, value in user.items():
            print(f"{key} : {value}")

    _Users.dump_emails()
    _Users.remove_all()
    _Users.dump_emails()
    _Users.get_users()
    _Users.dump_emails()
    _Users.order_by('firstName')


if __name__ == "__main__":
    main()