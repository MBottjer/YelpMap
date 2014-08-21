import json

__author__ = 'kthurime'


def filter_json():
    phoenix_json_file = open("phoenix_yelp_dataset.json", 'w')

    with open(
            "/Users/kthurime/PycharmProjects/YelpMap/python/data/yelp_academic_dataset_business.json") as input_json_file:
        for line in input_json_file:
            json_line = json.loads(line)

            if json_line["city"] == "Phoenix":
                with open("/Users/kthurime/PycharmProjects/YelpMap/python/data/phoenix_yelp_dataset.json",
                          'w') as outfile:
                    json.dump(json_line, outfile)

    input_json_file.close()
    phoenix_json_file.close()


if __name__ == "__main__":
    filter_json()
