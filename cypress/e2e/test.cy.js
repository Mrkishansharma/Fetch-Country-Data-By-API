import data from "../../submissionData.json"; // do not create this file
import { apiData, filter1, filter2, filter3 } from "../Fixtures/data.json";
// let data = [{ submission_link: "http://localhost:8080/", id: 67890 }];
import "cypress-localstorage-commands";

describe("Test", function () {
  let acc_score = 1;

  data.map(({ submission_link: url, id }) => {
    if (url.charAt(url.length - 1) != "/") {
      url = url + "/";
    }
    if (url && url.length) {
      beforeEach(() => {
        cy.intercept(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries`,
          (req) => {
            req.reply({
              data: apiData.data,
            });
          }
        ).as("apiRequest");
        cy.restoreLocalStorage();
      });
      afterEach(() => {
        cy.saveLocalStorage();
      });

      function CheckTable(data, score, index) {
        cy.get("tr").eq(index).contains("td", data.id);
        cy.get("tr").eq(index).contains("td", data.country);
        cy.get("tr")
          .eq(index)
          .contains("td", data.Rank)
          .then(() => {
            acc_score += score;
          });
        cy.get("tr")
          .eq(index)
          .contains("td", data.population)
          .then(() => {
            acc_score += score;
          });
      }

      it(`Check if the api call made`, () => {
        cy.visit(url);
        cy.wait("@apiRequest").then((data) => {
          acc_score += 1;
        });
      }); // 1
      it(`Student is able to loop through the data and append in the dom`, () => {
        cy.get("tbody")
          .children("tr")
          .should("have.length", apiData.data.length);
        apiData.data.forEach((el, i) => {
          CheckTable(el, 0, i + 1);
        });
        cy.then(() => {
          acc_score += 2;
        });
      }); // 2

      it(`Check the Search Part`, () => {
        cy.get("#search").clear().type("Ca");
        cy.get("form").submit();

        for (let i = 0; i < filter1.length; i++) {
          CheckTable(filter1[i], 0, i + 1);
        }
        cy.get("#search").clear().type("Fr");
        cy.get("form")
          .submit()
          .then(() => {
            for (let i = 0; i < filter2.length; i++) {
              CheckTable(filter2[i], 0, i + 1);
            }
          });

        cy.then(() => {
          acc_score += 2;
        });
      }); // 2

      it(`Search is not Casesensetive`, () => {
        cy.get("#search").clear().type("T");
        cy.get("form").submit();

        for (let i = 0; i < filter3.length; i++) {
          CheckTable(filter3[i], 0, i + 1);
        }
        cy.then(() => {
          acc_score += 1;
        });
      }); //1

      it(`Sorting is Working Fine`, () => {
        cy.intercept(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&&order=desc`
        ).as("descApiRequest");
        cy.intercept(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&&order=asc`
        ).as("ascApiRequest");
        cy.visit(url);
        cy.get("#sort").select("Descending");
        cy.wait("@descApiRequest");
        cy.get("#sort").select("Ascending");
        cy.wait("@ascApiRequest");
        cy.then(() => {
          acc_score += 1;
        });
      }); //1

      it(`Add country to visited`, () => {
        cy.reload();
        cy.wait("@apiRequest");
        expect(localStorage.getItem("visited")).to.eq(null);
        cy.get("tbody tr")
          .eq(0)
          .children("td")
          .eq(4)
          .click()
          .then(() => {
            expect(JSON.parse(localStorage.getItem("visited")).length).to.eq(1);
          });
        cy.get("tbody tr")
          .eq(1)
          .children("td")
          .eq(4)
          .click()
          .then(() => {
            expect(JSON.parse(localStorage.getItem("visited")).length).to.eq(2);
          });

        cy.then(() => {
          acc_score += 2;
        });
      }); //2

      it(`Check the visited page's table`, () => {
        cy.visit(`${url}visited.html`);
        CheckTable(apiData.data[0], 0, 1);
        CheckTable(apiData.data[1], 0, 2);
        cy.then(() => {
          acc_score += 2;
        });
      }); //2

      it(`Check the total Part`, () => {
        cy.get("#visited-total")
          .contains(2)
          .then(() => {
            acc_score += 1;
          });
      }); //1

      it(`Check the deleting`, () => {
        cy.get("tbody tr").eq(0).children("td").eq(4).click();
        CheckTable(apiData.data[1], 0, 1);
        cy.then(() => {
          acc_score += 1;
        });
      }); //1
      it(`Check the total after deleting`, () => {
        cy.get("#visited-total")
          .contains(1)
          .then(() => {
            acc_score += 1;
          });
      }); //1
    }

    it(`generate score`, () => {
      //////////////
      console.log(acc_score);
      let result = {
        id,
        marks: Math.floor(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
