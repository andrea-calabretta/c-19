#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "inserisci.h"
#include "ricerca.h"
#include "visualizza.h"
#include "stats.h"
#include "worker.h"
#include "classes.h"
#include "modifica.h"

#include <QMessageBox>

MainWindow::MainWindow(Worker &worker, QWidget *parent)
    : QMainWindow(parent), ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    QPixmap pix(":/images/page-GraphDatabase1.png");
    ui->label->setPixmap(pix.scaled(500,500));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_actionAbout_Our_Project_triggered()
{
    QMessageBox::about(this, "Message", "This is ...");
}

void MainWindow::on_actionExit_triggered()
{
    QApplication::quit();
}

void MainWindow::on_actioninserisci_triggered()
{
    Inserisci inseriscidialog(worker);
    inseriscidialog.setWindowTitle("Inserisci");
    inseriscidialog.setModal(true);
    inseriscidialog.exec();

}

void MainWindow::on_actionRicerca_triggered()
{
    Ricerca ricercadialog(worker);
    ricercadialog.setWindowTitle("Ricerca");
    ricercadialog.setModal(true);
    ricercadialog.exec();
}


void MainWindow::on_actionVisualizza_Database_triggered()
{
    Visualizza visualizzadialog;
    visualizzadialog.setWindowTitle("Visualizza Grafico");
    visualizzadialog.setModal(true);
    visualizzadialog.exec();
}

void MainWindow::on_actionVisualizza_Statistiche_triggered()
{
    Stats statsdialog;
    statsdialog.setWindowTitle("Visualizza Statistiche");
    statsdialog.setModal(true);
    statsdialog.exec();
}

void MainWindow::on_actionModifica_Dati_Paziente_triggered()
{
    Modifica modificadialog(worker);
    modificadialog.setWindowTitle("Modifica");
    modificadialog.setModal(true);
    modificadialog.exec();
}