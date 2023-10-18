"use strict";
const Mail = use("Mail");
const Suggestion = use("App/Models/Suggestion");

class SuggestionController {
  async sendSuggestionEmail({ request, response, auth }) {
    const { suggestion_name, suggestion_description } = request.all();
    const user = await auth.getUser();

    const suggestion = await Suggestion.create({
      suggestion_name,
      suggestion_description,
      user_id: user.user_id,
    });
    await suggestion.save();

    const mailData = {
      user: user.toJSON(),
      suggestion_name,
      suggestion_description,
    };

    // console.log("user admin role and email", users.toJSON());

    try {
      await Mail.send("emails.suggestions", mailData, (message) => {
        message;
        message
          .from({ address: user.email, name: user.name })
          .to("cmpunk589@outlook.com")
          .subject(suggestion_name)
          .cc(user.email);
      });
      // console.log("Email sent to", user.email);
      // console.log("Email sent from", user.email);

      return response.status(200).json({
        message: "Suggestion sent successfully",
        suggestion: {
          suggestion_name,
          suggestion_description,
          user_id: user.user_id,
        },
      });
    } catch (error) {
      console.error("Error while sending email", error);
      return response.status(500).json({
        error: "Failed to send suggestion email",
      });
    }
  }
}

module.exports = SuggestionController;
