import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import ExpenseForm from "../components/manageExpense/ExpenseForm";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/Style";
import { ExpenseContext } from "../store/expenses-context";

export default function ManageExpense({ route, navigation }) {
  const expenseCtx = useContext(ExpenseContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId; //if editedExpenseId is undefined, it will return false, otherwise true.

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.removeExpense(editedExpenseId);
    navigation.goBack();
  }

  function onCancelHandler() {
    navigation.goBack();
  }

  function onConfirmHandler(expenseData) {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={onCancelHandler}
        onSubmit={onConfirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={40}
            onTapped={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
