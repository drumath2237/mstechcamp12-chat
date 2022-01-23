import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (req.body.text != null) {
    context.bindings.signalRMessages = [
      {
        target: "newMessage",
        arguments: [req.body.text],
      },
    ];
  }
};

export default httpTrigger;
